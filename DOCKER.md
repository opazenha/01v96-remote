# Docker Setup for 01v96 Remote

This guide will help you run the 01v96 Remote application using Docker and Docker Compose, which solves many Windows compatibility issues.

## Prerequisites

1. **Install Docker Desktop** on Windows from [docker.com](https://www.docker.com/products/docker-desktop/)
2. **Install Docker Compose** (usually included with Docker Desktop)
3. **Connect your Yamaha 01v96 mixer** to your computer via USB or configure it for network access

## Quick Start

1. **Clone or download this project** to your local machine
2. **Navigate to the project directory** in your terminal/command prompt
3. **Run the application:**

```bash
docker-compose up --build
```

4. **Access the web interface** at: http://localhost:1337

## Configuration Options

### USB MIDI Connection (Recommended for Windows)

For USB MIDI connections on Windows, Docker Desktop should automatically handle device passthrough. If you encounter issues:

1. **Ensure Docker Desktop has access to USB devices:**
   - Open Docker Desktop settings
   - Go to "Resources" → "WSL Integration"
   - Enable USB device passthrough if available

2. **Alternative: Use dummy mode for testing:**
   ```bash
   docker-compose run --rm 01v96-remote node server.js dummy
   ```

### Serial Port Connection (Raspberry Pi)

If you're using a Raspberry Pi with serial connection:

1. **Uncomment the serial port lines** in `docker-compose.yml`:
   ```yaml
   volumes:
     - /dev/ttyAMA0:/dev/ttyAMA0
   devices:
     - /dev/ttyAMA0:/dev/ttyAMA0
   ```

2. **Run with elevated privileges:**
   ```bash
   docker-compose up --build --privileged
   ```

### Network MIDI Connection

For network-based MIDI connections, no special device mapping is needed. The application will work with the default Docker setup.

## Docker Compose Options

### Development Mode

To run in development with hot-reload:

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

### Production Mode

To run in production with restart policy:

```bash
docker-compose up -d --build
```

### Custom Configuration

You can customize the connection type by setting environment variables:

```bash
# Set connection type (midi, serialport, dummy)
MIXER_TYPE=dummy docker-compose up
```

Or modify the `docker-compose.yml` file:

```yaml
environment:
  - NODE_ENV=production
  - MIXER_TYPE=midi  # Options: midi, serialport, dummy
```

## Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Check what's using the ports
   netstat -ano | findstr :1337
   netstat -ano | findstr :1338
   
   # Or use different ports in docker-compose.yml
   ports:
     - "8080:1337"  # Use port 8080 instead
     - "8081:1338"
   ```

2. **MIDI device not found:**
   - Ensure your 01v96 is connected and powered on
   - Install Yamaha USB-MIDI drivers on Windows
   - Try running in dummy mode first: `docker-compose run --rm 01v96-remote node server.js dummy`

3. **Permission denied on Linux/macOS:**
   ```bash
   # Add your user to the docker group
   sudo usermod -aG docker $USER
   
   # Or run with sudo (not recommended)
   sudo docker-compose up
   ```

4. **Build fails with native module errors:**
   ```bash
   # Clean and rebuild
   docker-compose down
   docker system prune -f
   docker-compose up --build
   ```

### Logs and Debugging

View application logs:

```bash
# View logs in real-time
docker-compose logs -f

# View logs for specific service
docker-compose logs -f 01v96-remote

# Run with debug output
docker-compose run --rm 01v96-remote node server.js midi --debug
```

### Accessing the Container

For debugging, you can access the container shell:

```bash
docker-compose exec 01v96-remote sh
```

## Advanced Setup

### Using Nginx Reverse Proxy

Uncomment the nginx service in `docker-compose.yml` and create an `nginx.conf` file to add SSL termination or load balancing.

### Persistent Data

The `config` directory is mounted as a volume, so your mixer configurations will persist across container restarts.

### Environment Variables

You can create a `.env` file to customize settings:

```env
# .env file
NODE_ENV=production
MIXER_TYPE=midi
STATIC_PORT=1337
WEBSOCKET_PORT=1338
```

## Windows-Specific Notes

1. **Docker Desktop WSL2 Backend:** Ensure you're using WSL2 for better performance and device support
2. **Firewall:** Windows Firewall may block the ports - allow access when prompted
3. **Antivirus:** Some antivirus software may interfere with Docker - add exceptions if needed

## Support

If you encounter issues:

1. Check the [original README.md](README.md) for application-specific setup
2. Review Docker logs: `docker-compose logs`
3. Ensure your 01v96 mixer is properly configured for MIDI communication
4. Test with dummy mode first to isolate Docker vs. hardware issues

## Performance Tips

1. **Use Docker Desktop with WSL2** for better performance on Windows
2. **Allocate sufficient memory** to Docker Desktop (4GB+ recommended)
3. **Use SSD storage** for better I/O performance
4. **Enable Docker Desktop's file sharing** for the project directory