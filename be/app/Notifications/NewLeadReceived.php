<?php

namespace App\Notifications;

use App\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewLeadReceived extends Notification implements ShouldQueue
{
    use Queueable;

    protected $lead;

    /**
     * Create a new notification instance.
     */
    public function __construct(Lead $lead)
    {
        $this->lead = $lead;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('[Sophchem CMS] Khách hàng liên hệ mới - ' . $this->lead->name)
            ->greeting('Xin chào Quản trị viên,')
            ->line('Hệ thống vừa nhận được một yêu cầu liên hệ mới từ khách hàng.')
            ->line('Thông tin chi tiết như sau:')
            ->line('Họ tên: ' . $this->lead->name)
            ->line('Công ty: ' . ($this->lead->company ?: 'Chưa cung cấp'))
            ->line('Email: ' . $this->lead->email)
            ->line('Số điện thoại: ' . ($this->lead->phone ?: 'Chưa cung cấp'))
            ->line('Nội dung yêu cầu:')
            ->line('"' . $this->lead->message . '"')
            ->action('Xem chi tiết trên CMS', url('/admin/leads?search=' . urlencode($this->lead->email)))
            ->line('Vui lòng kiểm tra và xử lý liên hệ này sớm.');
    }
}
