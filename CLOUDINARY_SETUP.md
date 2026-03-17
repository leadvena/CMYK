# Cloudinary Integration Setup Guide

This guide explains how to set up Cloudinary for handling multiple file uploads in the CMYK Quote Form.

## What is Cloudinary?

Cloudinary is a cloud-based media management platform that handles file uploads, storage, and delivery. Using Cloudinary means:
- Files are uploaded directly to Cloudinary's secure servers
- No file size strain on your backend
- Fast, global CDN delivery of uploaded files
- Easy file management and transformations

## Setup Steps

### 1. Create a Cloudinary Account

1. Visit [Cloudinary.com](https://cloudinary.com) and sign up for a free account
2. Confirm your email address
3. Log in to your Cloudinary Dashboard

### 2. Get Your Credentials

In your Cloudinary Dashboard:

1. **Find Your Cloud Name**: It's displayed on your dashboard main page (looks like "abc123def")
2. **Create an Upload Preset**:
   - Go to **Settings** → **Upload**
   - Scroll to "Upload presets" section
   - Click "Add upload preset"
   - Set **Mode** to "Unsigned"
   - Leave other settings as default
   - Click "Save"
   - Copy the preset name (e.g., "my_preset")

### 3. Add Environment Variables

1. Create a `.env.local` file in your project root (or copy and edit `.env.example`)
2. Add your credentials:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
RESEND_API_KEY=your_resend_api_key
```

Replace:
- `your_cloud_name` with your Cloudinary Cloud Name
- `your_upload_preset` with your Upload Preset name
- `your_resend_api_key` with your Resend API key (for email delivery)

### 4. Restart Your Development Server

```bash
npm run dev
# or
yarn dev
```

## How It Works

### File Upload Flow

1. User selects files in the Quote Form
2. Files are uploaded directly to Cloudinary (client-side)
3. User sees upload progress feedback
4. Cloudinary returns secure URLs for the uploaded files
5. URLs are included in the quote email sent to your admin email

### Multiple File Support

The form supports unlimited file uploads with these features:
- **25MB per file limit** (matches Gmail's limit)
- **Drag and drop support** for better UX
- **Visual file list** showing uploaded files and sizes
- **Remove files** before submission with one click
- **Automatic cleanup** on form submission

## Supported File Types

The form accepts:
- Images: JPG, PNG, GIF, WebP, SVG
- Documents: PDF, DOC, DOCX, TXT
- Design Files: AI, PSD (if configured in Cloudinary)

## Email Configuration

Uploaded file URLs are included in the quote email as clickable links:
- Admin receives links to all uploaded files
- Files remain in Cloudinary for easy access
- Can manage/delete files in Cloudinary Dashboard anytime

## Troubleshooting

### "Cloudinary configuration missing" Error

- Check your `.env.local` file exists
- Verify `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET` are set
- Environment variables must start with `VITE_` to be exposed to frontend
- Restart dev server after adding env variables

### Files Not Uploading

1. Check browser console for errors (F12 → Console)
2. Verify Cloudinary credentials are correct
3. Ensure Upload Preset is in "Unsigned" mode
4. Check file size is under 25MB

### Preview Shows Blank After Adding Files

This is normal - refresh the page or wait for the build to complete.

## Security Notes

- We use **Unsigned Upload Presets** for simplicity
- Files go directly to Cloudinary (not through your server)
- Your API Secret is never exposed to the frontend
- Consider adding file type restrictions in Cloudinary settings for production

## API Reference

The QuoteForm uses the Cloudinary Upload API directly:

```javascript
POST https://api.cloudinary.com/v1_1/{cloud_name}/auto/upload

Body:
- file: File object
- upload_preset: Your preset name
```

Response includes `secure_url` which is stored and sent in quote emails.

## Further Reading

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Unsigned Uploads Guide](https://cloudinary.com/documentation/upload_widget#unsigned_uploads)
- [Upload Presets](https://cloudinary.com/documentation/upload_presets)
