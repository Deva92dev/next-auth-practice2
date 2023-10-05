import { connect } from '@/db/dbConfig';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // generate and hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // create new user and save it
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const userSaved = await newUser.save();
    console.log(userSaved);

    return NextResponse.json({
      message: 'User created Successfully',
      success: true,
      userSaved,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
