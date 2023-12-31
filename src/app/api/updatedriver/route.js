import { NextResponse } from "next/server";
import pool from "../../../connection/db";

export async function POST(request) {
  let payload = await request.json();

  // Extract relevant data from the payload for user insertion
  const { username, password, email, driverid } = payload;

  if (!username || !password || !email || !driverid ) {
    return NextResponse.json({ result: "Required field not found", success: false }, { status: 400 });
  }

  // Extract relevant data from the payload for driver insertion
  const { vehiclenumber, licensenumber, contactnumber } = payload;

  try {
    // Insert user data
    const userQuery = `UPDATE users
    SET username = $1, password = $2, email = $3
    WHERE driverid = $4;`
    const userValues = [username, password, email, driverid];

    // Insert driver data
    const driverQuery = `UPDATE drivers
    SET vehiclenumber = $1, licensenumber = $2, contactnumber = $3
    WHERE driverid = $4;`;
    const driverValues = [vehiclenumber, licensenumber, contactnumber,driverid];

    // Start a transaction
    await pool.query("BEGIN");

    // Insert user data
    await pool.query(userQuery, userValues);

    // Insert driver data
    await pool.query(driverQuery, driverValues);

    // Commit the transaction
    await pool.query("COMMIT");

    return NextResponse.json({ result: "Successfully Update user and driver", success: true }, { status: 201 });
  } catch (error) {
    console.error("Error executing SQL queries:", error);

    // Rollback the transaction in case of an error
    await pool.query("ROLLBACK");

    return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
  }
}

