import { NextResponse } from "next/server";
import connectDb from "@/app/middleware/dbConn";
import User from "@/app/models/userSchema";

export const POST = async (req, res) => {
  try {
    // Ensure the request contains JSON data
    const body = await req.json();

    console.log("Received request with body:", body);

    // Connect to the database
    const db = await connectDb();

    // Check if the user exists
    const user = await User.findOne({ email: body.email.toLowerCase() });

    console.log("User found in the database:", user);
  

    if (user && user.password === body.password) {
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        redirect: '/',

      }, {
        status: 200,
      });
    } else {
      console.log("Invalid credentials");
      return NextResponse.json({
        success: false,
        message: 'Invalid credentials',
      }, {
        status: 401,
      });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({
      success: false,
      message: 'Error during login. Please try again.',
    }, {
      status: 500,
    });
  }
};
