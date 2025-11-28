<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perPage = request("per_page", 15);
        $users = User::with(["roles" => function ($q) {
            $q->select("name");
        }])->paginate($perPage);
        return UserResource::collection($users);
    }

    public function toggleStatus($userId) {
        $foundUser = User::with(["roles" => function ($q) {
            $q->select("name");
        }])->where("id", $userId)->first();
        
        if (!$foundUser) {
            return response()->json(["message" => "El usuario no fue encontrado"], 404);
        }

        $currentStatus = $foundUser->status;
        $foundUser->status = $currentStatus === "Activo" ? "Inactivo" : "Activo";
        $foundUser->save();
        return response()->json(UserResource::make($foundUser));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
