# Notification Service

> **Part of SmartWallet (Hack-Cash)**  
> This service is a component of the SmartWallet project, located in the [SmartWallet_PaySafe_Hackathon](https://github.com/momchiltsanovv/SmartWallet_PaySafe_Hackathon) repository.

A Spring Boot-based email notification service that allows users to send email notifications and manage their notification preferences.

## Overview

This service provides a RESTful API for sending email notifications to users and managing their notification preferences. It stores notification history and user preferences in a MySQL database, and sends emails via SMTP (currently configured for Gmail).

## Features

- **Send Email Notifications**: Send email notifications to users with custom subject and body
- **Notification Preferences**: Users can enable/disable notifications and set their contact information
- **Notification History**: Retrieve notification history for a specific user
- **Status Tracking**: Tracks notification status (SUCCEEDED/FAILED)
- **Soft Delete**: Notifications support soft deletion

## Technology Stack

- **Java 21**
- **Spring Boot 3.5.7**
- **Spring Data JPA** - Database persistence
- **Spring Mail** - Email sending functionality
- **MySQL** - Database
- **Lombok** - Boilerplate code reduction
- **Maven** - Build tool

## API Endpoints

### Notifications

#### Send Notification
```
POST /api/v1/notifications
Content-Type: application/json

{
  "userId": "uuid",
  "subject": "Notification Subject",
  "body": "Notification Body"
}
```

#### Get Notification History
```
GET /api/v1/notifications?userId={userId}
```

### Preferences

#### Create/Update Preference
```
POST /api/v1/preferences
Content-Type: application/json

{
  "userId": "uuid",
  "notificationEnabled": true,
  "contactInfo": "user@example.com"
}
```

#### Get User Preference
```
GET /api/v1/preferences?userId={userId}
```

## Configuration

The application requires the following configuration in `application.properties`:

- **Database**: MySQL connection settings
- **Email**: SMTP server configuration (host, port, username, password)

## Database Schema

The service uses two main entities:

- **Notification**: Stores notification records with subject, body, status, type, and user association
- **NotificationPreference**: Stores user preferences including enabled status and contact information

## How It Works

1. Before sending a notification, the service checks if the user has notifications enabled
2. If enabled, it sends an email to the user's configured contact information
3. The notification is saved to the database with a status (SUCCEEDED or FAILED)
4. Users can retrieve their notification history and manage preferences through the API

## Running the Application

1. Ensure MySQL is running and configured
2. Update `application.properties` with your database and email credentials
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
4. The service will start on port 8081

## Project Structure

```
src/main/java/app/
├── Application.java                    # Main Spring Boot application
├── model/                             # Entity models
│   ├── Notification.java
│   ├── NotificationPreference.java
│   ├── NotificationStatus.java
│   └── NotificationType.java
├── repository/                         # JPA repositories
│   ├── NotificationRepository.java
│   └── NotificationPreferenceRepository.java
├── service/                            # Business logic
│   ├── NotificationService.java
│   └── PreferenceService.java
└── web/                                # REST controllers and DTOs
    ├── NotificationController.java
    ├── PreferenceController.java
    ├── dto/
    └── mapper/
```

