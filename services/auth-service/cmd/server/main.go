package main

import (
	"context"
	"log"
	"net"
	"os"
	"time"

	pb "github.com/podcast-platform/contracts/gen/go/auth/v1"
	"google.golang.org/grpc"
	"google.golang.org/grpc/health"
	"google.golang.org/grpc/health/grpc_health_v1"
	"google.golang.org/grpc/reflection"
)

const defaultPort = "8080"

// AuthServer implements the AuthService
type AuthServer struct {
	pb.UnimplementedAuthServiceServer
}

// Register implements auth.v1.AuthService
func (s *AuthServer) Register(ctx context.Context, req *pb.RegisterRequest) (*pb.AuthResponse, error) {
	log.Printf("Register request for email: %s", req.Email)
	// TODO: Implement actual registration logic
	// - Check if user exists
	// - Hash password
	// - Create user in database
	// - Generate tokens
	
	return &pb.AuthResponse{
		AccessToken:  "sample-access-token",
		RefreshToken: "sample-refresh-token",
		AccessTokenExpiresIn: 86400, // 24 hours
		User: &pb.User{
			Id:    "sample-user-id",
			Email: req.Email,
			DisplayName: req.DisplayName,
			Role:  pb.UserRole_LISTENER,
			IsVerified: false,
		},
	}, nil
}

// Login implements auth.v1.AuthService
func (s *AuthServer) Login(ctx context.Context, req *pb.LoginRequest) (*pb.AuthResponse, error) {
	log.Printf("Login request for email: %s", req.Email)
	// TODO: Implement actual login logic
	// - Verify email/password
	// - Generate tokens
	
	return &pb.AuthResponse{
		AccessToken:  "sample-access-token",
		RefreshToken: "sample-refresh-token",
		AccessTokenExpiresIn: 86400,
		User: &pb.User{
			Id:    "sample-user-id",
			Email: req.Email,
			DisplayName: "Sample User",
			Role:  pb.UserRole_LISTENER,
			IsVerified: true,
		},
	}, nil
}

// RefreshToken implements auth.v1.AuthService
func (s *AuthServer) RefreshToken(ctx context.Context, req *pb.RefreshRequest) (*pb.AuthResponse, error) {
	log.Printf("Refresh token request")
	// TODO: Implement token refresh logic
	
	return &pb.AuthResponse{
		AccessToken:  "new-access-token",
		RefreshToken: "new-refresh-token",
		AccessTokenExpiresIn: 86400,
	}, nil
}

// ValidateToken implements auth.v1.AuthService
func (s *AuthServer) ValidateToken(ctx context.Context, req *pb.ValidateRequest) (*pb.ValidateResponse, error) {
	log.Printf("Validate token request")
	// TODO: Implement token validation
	
	return &pb.ValidateResponse{
		IsValid: true,
		User: &pb.User{
			Id:    "sample-user-id",
			Email: "user@example.com",
			Role:  pb.UserRole_LISTENER,
		},
		Permissions: []string{"read:podcasts", "write:library"},
	}, nil
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	// Create listener
	lis, err := net.Listen("tcp", ":"+port)
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	// Create gRPC server
	grpcServer := grpc.NewServer()
	
	// Register services
	pb.RegisterAuthServiceServer(grpcServer, &AuthServer{})
	
	// Register health check
	healthServer := health.NewServer()
	grpc_health_v1.RegisterHealthServer(grpcServer, healthServer)
	healthServer.SetServingStatus("", grpc_health_v1.HealthCheckResponse_SERVING)
	
	// Enable reflection (for tools like grpcurl)
	reflection.Register(grpcServer)
	
	// Start HTTP server for health checks
	go func() {
		log.Println("Starting HTTP health check server on :8081")
		httpServer := &http.Server{
			Addr:    ":8081",
			Handler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				if r.URL.Path == "/health" {
					w.Header().Set("Content-Type", "application/json")
					w.WriteHeader(http.StatusOK)
					w.Write([]byte(`{"status":"healthy"}`))
					return
				}
				http.NotFound(w, r)
			}),
		}
		if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("HTTP server failed: %v", err)
		}
	}()

	// Graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")
	
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	
	healthServer.SetServingStatus("", grpc_health_v1.HealthCheckResponse_NOT_SERVING)
	grpcServer.GracefulStop()
	log.Println("Server stopped")
}
