import { NextResponse } from "next/server";
import connectDb from "@/app/middleware/dbConn";
import User from "@/app/models/userSchema";

export const POST = async (req, res) => {
  try {
    // Ensure the request contains JSON data
    const body = await req.json();

    // Connect to the database
    const db = await connectDb();
 

    // Check if the user already exists
    const existingUser = await User.findOne({ email: body.email });

    if (existingUser) {
      return NextResponse.json({
        message: 'User with this email already exists please press login',
      }, {
        status: 400,
      });
    }

    // If the user doesn't exist, proceed with registration
    await User.create(body);

    return NextResponse.json({
      message: 'User registered successfully',
    }, {
      status: 200,
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    return NextResponse.json({
      message: 'Error during registration. Please try again.',
    }, {
      status: 500,
    });
  }
};
