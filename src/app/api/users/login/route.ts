import { connect } from '@/db/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // check user if exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: `user doesn't exists` },
        { status: 400 }
      );
    }

    console.log('User Exists');

    // check if password is valid
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: 'Invalid Password' }, { status: 400 });
    }
    console.log(validPassword);

    // create token data from db
    const tokenData = {
      id: user._id,
      email: user.email,
      password: user.password,
    };

    // create token set cookies
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '1d',
    });
    const response = NextResponse.json({
      message: 'Login Successful',
      success: true,
    });
    response.cookies.set('token', token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
