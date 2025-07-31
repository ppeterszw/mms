# Estate Agents Council - Installation Guide

## Ubuntu 24.04 Server Installation

This guide provides step-by-step instructions for installing the Estate Agents Council application on Ubuntu 24.04 server.

## Prerequisites

- Ubuntu 24.04 LTS server
- Root or sudo access
- Domain name (optional but recommended)
- SSL certificate (Let's Encrypt recommended)

## 1. System Update and Dependencies

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release

# Install build essentials
sudo apt install -y build-essential
```

## 2. Install Node.js 20.x

```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
```

## 3. Install PM2 Process Manager

```bash
# Install PM2 globally
sudo npm install -g pm2

# Setup PM2 startup script
sudo pm2 startup systemd

# Verify PM2 installation
pm2 --version
```

## 4. Install and Configure Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check Nginx status
sudo systemctl status nginx
```

## 5. Install PostgreSQL (Optional - if not using Supabase)

```bash
# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Start and enable PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql
CREATE DATABASE estate_agents_council;
CREATE USER eac_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE estate_agents_council TO eac_user;
\q
```

## 6. Setup Application Directory

```bash
# Create application directory
sudo mkdir -p /var/www/estate-agents-council
sudo chown $USER:$USER /var/www/estate-agents-council

# Navigate to application directory
cd /var/www/estate-agents-council
```

## 7. Clone and Setup Application

```bash
# Clone the repository (replace with your actual repository URL)
git clone https://github.com/your-username/estate-agents-council.git .

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit environment variables
nano .env
```

### Environment Configuration (.env)

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Application Configuration
VITE_APP_NAME=Estate Agents Council
VITE_APP_URL=https://your-domain.com

# Paynow Configuration (for Zimbabwe payments)
VITE_PAYNOW_INTEGRATION_ID=your_paynow_integration_id
VITE_PAYNOW_INTEGRATION_KEY=your_paynow_integration_key
VITE_PAYNOW_RETURN_URL=https://your-domain.com/payment/return
VITE_PAYNOW_RESULT_URL=https://your-domain.com/api/paynow/callback
```

## 8. Build Application

```bash
# Build the application for production
npm run build

# Verify build directory
ls -la dist/
```

## 9. Configure Nginx

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/estate-agents-council
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    root /var/www/estate-agents-council/dist;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security
    location ~ /\. {
        deny all;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/estate-agents-council /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## 10. Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run

# Setup automatic renewal
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

## 11. Setup Firewall

```bash
# Install and configure UFW
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw status
```

## 12. Setup Monitoring and Logging

```bash
# Create log directory
sudo mkdir -p /var/log/estate-agents-council

# Setup log rotation
sudo nano /etc/logrotate.d/estate-agents-council
```

### Log Rotation Configuration

```
/var/log/estate-agents-council/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
}
```

## 13. Database Setup (Supabase)

### Option A: Using Supabase Cloud

1. **Create Supabase Project**
   ```bash
   # Visit https://supabase.com
   # Create new project
   # Copy project URL and anon key to .env file
   ```

2. **Run Database Migrations**
   ```bash
   # Install Supabase CLI (optional)
   npm install -g supabase
   
   # Or manually run SQL migrations in Supabase dashboard
   # Copy contents of supabase/migrations/*.sql files
   # Run in Supabase SQL editor
   ```

### Option B: Self-hosted Supabase

```bash
# Install Docker
sudo apt install -y docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER

# Clone Supabase
git clone --depth 1 https://github.com/supabase/supabase
cd supabase/docker

# Start Supabase
docker-compose up -d

# Access Supabase Studio at http://localhost:3000
```

## 14. Application Deployment Script

Create a deployment script for easy updates:

```bash
# Create deployment script
nano /var/www/estate-agents-council/deploy.sh
```

### Deployment Script

```bash
#!/bin/bash

# Estate Agents Council Deployment Script

set -e

echo "🚀 Starting deployment..."

# Pull latest changes
git pull origin main

# Install dependencies
npm ci

# Build application
npm run build

# Restart services
sudo systemctl reload nginx

echo "✅ Deployment completed successfully!"
echo "🌐 Application available at: https://your-domain.com"
```

```bash
# Make script executable
chmod +x /var/www/estate-agents-council/deploy.sh
```

## 15. Backup Strategy

### Database Backup Script

```bash
# Create backup script
sudo nano /usr/local/bin/backup-eac.sh
```

```bash
#!/bin/bash

# Estate Agents Council Backup Script

BACKUP_DIR="/var/backups/estate-agents-council"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup application files
tar -czf $BACKUP_DIR/app_$DATE.tar.gz -C /var/www estate-agents-council

# Backup database (if using local PostgreSQL)
# sudo -u postgres pg_dump estate_agents_council > $BACKUP_DIR/db_$DATE.sql

# Keep only last 30 days of backups
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
find $BACKUP_DIR -name "*.sql" -mtime +30 -delete

echo "Backup completed: $DATE"
```

```bash
# Make backup script executable
sudo chmod +x /usr/local/bin/backup-eac.sh

# Setup daily backup cron job
sudo crontab -e
# Add this line:
0 2 * * * /usr/local/bin/backup-eac.sh
```

## 16. Performance Optimization

### Nginx Optimization

```bash
# Edit Nginx main configuration
sudo nano /etc/nginx/nginx.conf
```

Add these optimizations:

```nginx
# Worker processes
worker_processes auto;
worker_rlimit_nofile 65535;

events {
    worker_connections 1024;
    multi_accept on;
    use epoll;
}

http {
    # Basic settings
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    
    # Buffer sizes
    client_body_buffer_size 128k;
    client_max_body_size 10m;
    client_header_buffer_size 1k;
    large_client_header_buffers 4 4k;
    output_buffers 1 32k;
    postpone_output 1460;
}
```

## 17. Security Hardening

```bash
# Install fail2ban
sudo apt install -y fail2ban

# Configure fail2ban for Nginx
sudo nano /etc/fail2ban/jail.local
```

### Fail2ban Configuration

```ini
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[nginx-http-auth]
enabled = true

[nginx-noscript]
enabled = true

[nginx-badbots]
enabled = true

[nginx-noproxy]
enabled = true
```

```bash
# Start fail2ban
sudo systemctl start fail2ban
sudo systemctl enable fail2ban
```

## 18. Monitoring Setup

### Install and Configure Netdata

```bash
# Install Netdata
bash <(curl -Ss https://my-netdata.io/kickstart.sh)

# Configure Netdata
sudo nano /etc/netdata/netdata.conf
```

### Basic Monitoring Script

```bash
# Create monitoring script
nano /usr/local/bin/monitor-eac.sh
```

```bash
#!/bin/bash

# Estate Agents Council Monitoring Script

# Check Nginx status
if ! systemctl is-active --quiet nginx; then
    echo "❌ Nginx is down - restarting..."
    sudo systemctl restart nginx
fi

# Check disk space
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
    echo "⚠️  Disk usage is at ${DISK_USAGE}%"
fi

# Check memory usage
MEMORY_USAGE=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
if [ $MEMORY_USAGE -gt 80 ]; then
    echo "⚠️  Memory usage is at ${MEMORY_USAGE}%"
fi

echo "✅ System check completed"
```

```bash
# Make monitoring script executable
chmod +x /usr/local/bin/monitor-eac.sh

# Setup monitoring cron job (every 5 minutes)
crontab -e
# Add this line:
*/5 * * * * /usr/local/bin/monitor-eac.sh
```

## 19. Application Configuration

### Supabase Setup

1. **Create Supabase Project**
   - Visit [Supabase Dashboard](https://supabase.com/dashboard)
   - Create new project
   - Note down Project URL and API Keys

2. **Run Database Migrations**
   - Copy SQL from `supabase/migrations/create_initial_schema.sql`
   - Run in Supabase SQL Editor
   - Copy SQL from `supabase/migrations/insert_sample_data.sql`
   - Run in Supabase SQL Editor

3. **Configure Authentication**
   - Enable Email/Password authentication
   - Disable email confirmation for development
   - Configure redirect URLs

### Environment Variables

Update `/var/www/estate-agents-council/.env`:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Application Configuration
VITE_APP_NAME=Estate Agents Council
VITE_APP_URL=https://your-domain.com

# Paynow Configuration
VITE_PAYNOW_INTEGRATION_ID=your_integration_id
VITE_PAYNOW_INTEGRATION_KEY=your_integration_key
VITE_PAYNOW_RETURN_URL=https://your-domain.com/payment/return
VITE_PAYNOW_RESULT_URL=https://your-domain.com/api/paynow/callback
```

## 20. Testing and Verification

```bash
# Test application build
cd /var/www/estate-agents-council
npm run build

# Test Nginx configuration
sudo nginx -t

# Check application accessibility
curl -I http://localhost

# Check SSL certificate (if configured)
curl -I https://your-domain.com

# Check logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## 21. Default Admin Account

After database setup, create an admin account:

1. **Register through the application**
2. **Update user role in database**:
   ```sql
   UPDATE profiles 
   SET role = 'admin' 
   WHERE email = 'admin@your-domain.com';
   ```

## 22. Maintenance Commands

### Regular Maintenance

```bash
# Update application
cd /var/www/estate-agents-council
./deploy.sh

# Check system status
sudo systemctl status nginx
sudo systemctl status postgresql  # if using local DB

# View application logs
sudo tail -f /var/log/nginx/access.log

# Check disk space
df -h

# Check memory usage
free -h

# Check running processes
ps aux | grep nginx
```

### Troubleshooting

```bash
# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Test Nginx configuration
sudo nginx -t

# Restart services
sudo systemctl restart nginx

# Check firewall status
sudo ufw status

# Check SSL certificate
sudo certbot certificates
```

## 23. Performance Tuning

### Nginx Caching

```bash
# Create cache directory
sudo mkdir -p /var/cache/nginx/estate-agents-council
sudo chown www-data:www-data /var/cache/nginx/estate-agents-council
```

Add to Nginx configuration:

```nginx
# Add to http block
proxy_cache_path /var/cache/nginx/estate-agents-council levels=1:2 keys_zone=estate_cache:10m max_size=100m inactive=60m use_temp_path=off;

# Add to server block
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header Vary Accept-Encoding;
}
```

## 24. Backup and Recovery

### Automated Backup

```bash
# Setup automated backup to cloud storage (optional)
# Install rclone for cloud backup
curl https://rclone.org/install.sh | sudo bash

# Configure cloud storage
rclone config

# Add to backup script
rclone sync /var/backups/estate-agents-council remote:estate-agents-council-backups
```

## 25. Final Checklist

- [ ] System updated and secured
- [ ] Node.js 20.x installed
- [ ] Nginx configured and running
- [ ] SSL certificate installed
- [ ] Application built and deployed
- [ ] Database configured (Supabase)
- [ ] Environment variables set
- [ ] Firewall configured
- [ ] Monitoring setup
- [ ] Backup strategy implemented
- [ ] Admin account created
- [ ] Application accessible via domain

## Support and Maintenance

### Regular Tasks

1. **Weekly**: Check system logs and performance
2. **Monthly**: Update system packages and review backups
3. **Quarterly**: Review SSL certificates and security updates

### Emergency Contacts

- System Administrator: admin@your-domain.com
- Technical Support: support@your-domain.com

### Useful Commands

```bash
# Quick status check
sudo systemctl status nginx postgresql

# View recent logs
sudo journalctl -u nginx -f

# Check application health
curl -s -o /dev/null -w "%{http_code}" http://localhost

# Restart all services
sudo systemctl restart nginx
```

---

## Conclusion

Your Estate Agents Council application is now successfully installed on Ubuntu 24.04! The application includes:

- ✅ Complete database schema with Supabase
- ✅ User authentication and authorization
- ✅ Member and organization management
- ✅ CPD tracking and compliance
- ✅ Document management system
- ✅ Payment processing integration
- ✅ Messaging and notifications
- ✅ Admin and organization portals
- ✅ SSL security and performance optimization

For additional support or customization, refer to the application documentation or contact the development team.