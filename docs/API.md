# Estate Agents Council - API Documentation

## API Overview

The Estate Agents Council application uses Supabase for backend services, providing a comprehensive REST API with real-time capabilities.

## Authentication

### Base URL
```
https://your-project-id.supabase.co/rest/v1/
```

### Headers
```javascript
{
  'apikey': 'your-supabase-anon-key',
  'Authorization': 'Bearer your-jwt-token',
  'Content-Type': 'application/json'
}
```

## Core API Endpoints

### 1. Authentication

#### Sign Up
```javascript
POST /auth/v1/signup
{
  "email": "user@example.com",
  "password": "password123",
  "data": {
    "name": "John Doe",
    "role": "member"
  }
}
```

#### Sign In
```javascript
POST /auth/v1/token?grant_type=password
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Sign Out
```javascript
POST /auth/v1/logout
```

### 2. Profiles

#### Get Current Profile
```javascript
GET /profiles?id=eq.{user_id}&select=*
```

#### Update Profile
```javascript
PATCH /profiles?id=eq.{user_id}
{
  "name": "Updated Name",
  "phone": "+1234567890",
  "location": "New York, NY"
}
```

### 3. Members

#### Get All Members
```javascript
GET /members?select=*,profile:profiles(*),organization:organizations(*),member_type:member_types(*)
```

#### Get Member by ID
```javascript
GET /members?id=eq.{member_id}&select=*,profile:profiles(*),organization:organizations(*)
```

#### Create Member
```javascript
POST /members
{
  "profile_id": "user-uuid",
  "organization_id": "org-uuid",
  "member_type_id": "type-uuid",
  "real_estate_member_type": "real_estate_agent",
  "membership_tier": "premium",
  "job_title": "Senior Agent",
  "department": "Sales"
}
```

#### Update Member
```javascript
PATCH /members?id=eq.{member_id}
{
  "job_title": "Lead Agent",
  "membership_tier": "elite",
  "bio": "Updated bio"
}
```

#### Get Organization Members
```javascript
GET /members?organization_id=eq.{org_id}&select=*,profile:profiles(*)
```

### 4. Organizations

#### Get All Organizations
```javascript
GET /organizations?select=*,principal_agent:profiles(*)
```

#### Get Organization by ID
```javascript
GET /organizations?id=eq.{org_id}&select=*,principal_agent:profiles(*),members:members(count)
```

#### Create Organization
```javascript
POST /organizations
{
  "name": "Premier Real Estate",
  "email": "contact@premier.com",
  "phone": "+1234567890",
  "location": "New York, NY",
  "firm_registration_number": "RE-ORG-2024-001",
  "principal_agent_id": "agent-uuid",
  "organization_size": "50-100 employees",
  "tier": "premium"
}
```

#### Update Organization
```javascript
PATCH /organizations?id=eq.{org_id}
{
  "tier": "elite",
  "annual_subscription_paid": true,
  "subscription_expiry_date": "2025-12-31"
}
```

### 5. CPD Events

#### Get All CPD Events
```javascript
GET /cpd_events?select=*&order=event_date.asc
```

#### Get Upcoming Events
```javascript
GET /cpd_events?event_date=gte.{today}&status=eq.upcoming&select=*
```

#### Create CPD Event
```javascript
POST /cpd_events
{
  "title": "Real Estate Law Workshop",
  "description": "Understanding legal requirements",
  "event_date": "2024-03-15",
  "start_time": "18:00",
  "end_time": "21:00",
  "duration_hours": 4.0,
  "event_type": "workshop",
  "format": "in-person",
  "location": "Conference Center",
  "capacity": 60,
  "price": 25.00,
  "provider": "Estate Agents Council",
  "category": "Legal & Ethics"
}
```

#### Register for Event
```javascript
POST /cpd_attendance
{
  "member_id": "member-uuid",
  "event_id": "event-uuid"
}
```

#### Mark Attendance
```javascript
PATCH /cpd_attendance?member_id=eq.{member_id}&event_id=eq.{event_id}
{
  "attended": true,
  "hours_earned": 4.0,
  "certificate_url": "https://certificates.com/cert.pdf"
}
```

### 6. Member CPD Hours

#### Get Member CPD Summary
```javascript
POST /rpc/get_member_cpd_hours
{
  "member_uuid": "member-uuid",
  "year_filter": 2024
}
```

Response:
```javascript
[
  {
    "current_year_hours": 18.5,
    "total_hours": 45.5,
    "annual_target": 40,
    "compliance_status": "on-track"
  }
]
```

### 7. Documents

#### Get Member Documents
```javascript
GET /documents?member_id=eq.{member_id}&select=*
```

#### Upload Document
```javascript
POST /documents
{
  "member_id": "member-uuid",
  "document_type": "educational_qualifications",
  "file_name": "certificate.pdf",
  "file_url": "https://storage.com/file.pdf",
  "file_size": 2048576,
  "mime_type": "application/pdf"
}
```

#### Review Document
```javascript
PATCH /documents?id=eq.{doc_id}
{
  "status": "approved",
  "reviewed_by": "admin-uuid",
  "review_notes": "Document approved",
  "reviewed_at": "2024-03-15T10:00:00Z"
}
```

### 8. Payments

#### Get Member Payments
```javascript
GET /payments?member_id=eq.{member_id}&select=*&order=payment_date.desc
```

#### Create Payment Record
```javascript
POST /payments
{
  "member_id": "member-uuid",
  "amount": 250.00,
  "currency": "USD",
  "payment_method": "paynow",
  "description": "Annual membership fee",
  "membership_period_start": "2024-01-01",
  "membership_period_end": "2024-12-31"
}
```

#### Update Payment Status
```javascript
PATCH /payments?id=eq.{payment_id}
{
  "status": "completed",
  "receipt_number": "REC-2024-001",
  "external_transaction_id": "txn_123456"
}
```

### 9. Messages

#### Get User Messages
```javascript
GET /messages?or=(sender_id.eq.{user_id},recipient_id.eq.{user_id})&select=*,sender:profiles!sender_id(*),recipient:profiles!recipient_id(*)&order=sent_at.desc
```

#### Send Message
```javascript
POST /messages
{
  "sender_id": "sender-uuid",
  "recipient_id": "recipient-uuid",
  "subject": "Meeting Request",
  "content": "Would you like to meet for coffee?"
}
```

#### Mark Message as Read
```javascript
PATCH /messages?id=eq.{message_id}
{
  "read": true,
  "read_at": "2024-03-15T10:00:00Z"
}
```

### 10. Notifications

#### Get User Notifications
```javascript
GET /notifications?user_id=eq.{user_id}&order=created_at.desc
```

#### Create Notification
```javascript
POST /notifications
{
  "user_id": "user-uuid",
  "title": "Payment Received",
  "message": "Your annual membership payment has been processed",
  "type": "success",
  "action_url": "/subscriptions"
}
```

#### Mark Notification as Read
```javascript
PATCH /notifications?id=eq.{notification_id}
{
  "read": true
}
```

## Advanced Queries

### Member Statistics
```javascript
GET /members?select=registration_status,membership_tier,real_estate_member_type&organization_id=eq.{org_id}
```

### CPD Compliance Report
```javascript
POST /rpc/get_member_cpd_hours
{
  "member_uuid": "member-uuid"
}
```

### Organization Dashboard Data
```javascript
GET /members?organization_id=eq.{org_id}&select=*,profile:profiles(*),cpd_hours:cpd_attendance(hours_earned)
```

## Real-time Subscriptions

### Listen to New Messages
```javascript
const subscription = supabase
  .channel('messages')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'messages',
    filter: `recipient_id=eq.${userId}`
  }, (payload) => {
    console.log('New message:', payload.new);
  })
  .subscribe();
```

### Listen to CPD Event Updates
```javascript
const subscription = supabase
  .channel('cpd_events')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'cpd_events'
  }, (payload) => {
    console.log('CPD event updated:', payload);
  })
  .subscribe();
```

### Listen to Member Status Changes
```javascript
const subscription = supabase
  .channel('members')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'members',
    filter: `organization_id=eq.${orgId}`
  }, (payload) => {
    console.log('Member updated:', payload.new);
  })
  .subscribe();
```

## Error Handling

### Common Error Codes
- `400`: Bad Request - Invalid data
- `401`: Unauthorized - Invalid or missing token
- `403`: Forbidden - Insufficient permissions
- `404`: Not Found - Resource doesn't exist
- `409`: Conflict - Duplicate data
- `422`: Unprocessable Entity - Validation errors

### Error Response Format
```javascript
{
  "error": {
    "message": "Error description",
    "details": "Additional error details",
    "hint": "Suggestion for fixing the error",
    "code": "ERROR_CODE"
  }
}
```

## Rate Limiting

Supabase implements rate limiting:
- **Anonymous requests**: 100 requests per hour
- **Authenticated requests**: 1000 requests per hour
- **File uploads**: 100 MB per hour

## File Storage

### Upload Document
```javascript
const { data, error } = await supabase.storage
  .from('documents')
  .upload(`${memberId}/${fileName}`, file);
```

### Get Document URL
```javascript
const { data } = supabase.storage
  .from('documents')
  .getPublicUrl(`${memberId}/${fileName}`);
```

### Delete Document
```javascript
const { error } = await supabase.storage
  .from('documents')
  .remove([`${memberId}/${fileName}`]);
```

## Webhooks

### Payment Webhook (Paynow)
```javascript
POST /api/webhooks/paynow
{
  "reference": "payment-reference",
  "paynowreference": "paynow-ref",
  "amount": "250.00",
  "status": "Paid",
  "pollurl": "https://paynow.co.zw/interface/poll"
}
```

### Document Processing Webhook
```javascript
POST /api/webhooks/documents
{
  "document_id": "doc-uuid",
  "status": "processed",
  "file_url": "https://storage.com/processed.pdf"
}
```

## SDK Usage Examples

### JavaScript/TypeScript
```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
);

// Get current user profile
const getCurrentProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
    
  return data;
};

// Get member with CPD hours
const getMemberWithCPD = async (memberId) => {
  const { data: member } = await supabase
    .from('members')
    .select('*')
    .eq('id', memberId)
    .single();
    
  const { data: cpdHours } = await supabase
    .rpc('get_member_cpd_hours', { member_uuid: memberId });
    
  return { ...member, cpdHours: cpdHours[0] };
};
```

## Testing

### API Testing with curl

```bash
# Get all members (requires auth token)
curl -X GET \
  'https://your-project.supabase.co/rest/v1/members?select=*' \
  -H 'apikey: your-anon-key' \
  -H 'Authorization: Bearer your-jwt-token'

# Create new member
curl -X POST \
  'https://your-project.supabase.co/rest/v1/members' \
  -H 'apikey: your-anon-key' \
  -H 'Authorization: Bearer your-jwt-token' \
  -H 'Content-Type: application/json' \
  -d '{
    "profile_id": "user-uuid",
    "real_estate_member_type": "real_estate_agent",
    "membership_tier": "premium"
  }'
```

### Integration Testing

```javascript
// Test member registration flow
describe('Member Registration', () => {
  it('should create member profile', async () => {
    const { data, error } = await supabase
      .from('members')
      .insert({
        profile_id: testUserId,
        real_estate_member_type: 'real_estate_agent',
        membership_tier: 'basic'
      })
      .select()
      .single();
      
    expect(error).toBeNull();
    expect(data.registration_status).toBe('pending');
  });
});
```

This API documentation provides comprehensive coverage of all available endpoints and functionality for the Estate Agents Council application.