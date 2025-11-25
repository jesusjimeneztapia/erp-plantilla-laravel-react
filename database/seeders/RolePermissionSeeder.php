<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // roles
        $superadminRole = Role::create(["name" => "superadmin"]);
        
        // permissions
        $permissionViewPermissions = Permission::create(["name" => "view.permissions"]);
        $permissionCreatePermissions = Permission::create(["name" => "create.permissions"]);
        $permissionEditPermissions = Permission::create(["name" => "edit.permissions"]);
        $permissionDeletePermissions = Permission::create(["name" => "delete.permissions"]);
        $permissionAssignPermissions = Permission::create(["name" => "assign.permissions"]);

        // roles permissions
        $permissionViewRoles = Permission::create(["name" => "view.roles"]);
        $permissionCreateRoles = Permission::create(["name" => "create.roles"]);
        $permissionEditRoles = Permission::create(["name" => "edit.roles"]);
        $permissionDeleteRoles = Permission::create(["name" => "delete.roles"]);
        $permissionAssignRoles = Permission::create(["name" => "assign.roles"]);

        // users permissions
        $permissionViewUsers = Permission::create(["name" => "view.users"]);
        $permissionCreateUsers = Permission::create(["name" => "create.users"]);
        $permissionEditUsers = Permission::create(["name" => "edit.users"]);
        $permissionDeleteUsers = Permission::create(["name" => "delete.users"]);

        // assign permissions to superadmin rol
        $superadminRole->givePermissionTo(Permission::all());
    }
}
