<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password', 'role_id', 'phone', 'avatar', 'bio'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the user's role.
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Check if the user has a specific permission.
     */
    public function hasPermission(string $permission): bool
    {
        if ($this->email === 'admin@sophpower.com') {
            return true;
        }

        if (!$this->role) {
            return false;
        }

        $permissions = $this->role->permissions;

        if (!is_array($permissions)) {
            return false;
        }

        // Super Admin has wildcard '*' permission
        if (in_array('*', $permissions, true)) {
            return true;
        }

        return in_array($permission, $permissions, true);
    }

    /**
     * Check if the user has any of the specified permissions.
     */
    public function hasAnyPermission(array $permissions): bool
    {
        if ($this->email === 'admin@sophpower.com') {
            return true;
        }

        if (!$this->role) {
            return false;
        }

        $userPermissions = $this->role->permissions;

        if (!is_array($userPermissions)) {
            return false;
        }

        if (in_array('*', $userPermissions, true)) {
            return true;
        }

        foreach ($permissions as $permission) {
            if (in_array($permission, $userPermissions, true)) {
                return true;
            }
        }

        return false;
    }
}
