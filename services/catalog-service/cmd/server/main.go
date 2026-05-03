package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"
	"syscall"
	"time"

	pb "github.com/podcast-platform/contracts/gen/go/catalog/v1"
	"google.golang.org/grpc"
	"google.golang.org/grpc/health"
	"google.golang.org/grpc/health/grpc_health_v1"
)

const defaultPort = "8082"

// CatalogServer implements the CatalogService
type CatalogServer struct {
	pb.UnimplementedCatalogServiceServer
	// TODO: Add database connection, Redis client, etc.
}

func (s *CatalogServer) GetPodcast(ctx context.Context, req *pb.GetPodcastRequest) (*pb.Podcast, error) {
	log.Printf("GetPodcast request: %s", req.PodcastId)
	// TODO: Implement actual database query
	return &pb.Podcast{
		Id:    req.PodcastId,
		Title: "Sample Podcast",
	}, nil
}

func (s *CatalogServer) ListPodcasts(ctx context.Context, req *pb.ListPodcastsRequest) (*pb.ListPodcastsResponse, error) {
	log.Printf("ListPodcasts request")
	// TODO: Implement actual database query with filters
	return &pb.ListPodcastsResponse{
		Podcasts: []*pb.Podcast{
			{Id: "sample-1", Title: "Podcast 1"},
			{Id: "sample-2", Title: "Podcast 2"},
		},
		TotalCount: 2,
	}, nil
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	// Create gRPC server
	grpcServer := grpc.NewServer()

	// Register catalog service
	pb.RegisterCatalogServiceServer(grpcServer, &CatalogServer{})

	// Register health check
	healthServer := health.NewServer()
	grpc_health_v1.RegisterHealthServer(grpcServer, healthServer)
	healthServer.SetServingStatus("", grpc_health_v1.HealthCheckResponse_SERVING)

	// Create listener
	lis, err := net.Listen("tcp", ":"+port)
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	// Graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	go func() {
		<-quit
		log.Println("Shutting down server...")
		healthServer.SetServingStatus("", grpc_health_v1.HealthCheckResponse_NOT_SERVING)
		grpcServer.GracefulStop()
	}()

	log.Printf("Catalog Service listening on :%s", port)
	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
