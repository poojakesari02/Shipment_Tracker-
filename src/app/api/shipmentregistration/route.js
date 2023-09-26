import { NextResponse } from "next/server";
import pool from "../../../connection/db";

export async function POST(request) {
  let payload = await request.json();

  // Extract relevant data from the payload
  const { customername, destinationaddress, planneddeliverydate } = payload;

  if (!customername || !destinationaddress  || !planneddeliverydate) {
    return NextResponse.json({ result: "Required field not found", success: false }, { status: 400 });
  }

  try {
    const query = "INSERT INTO shipments (customername, destinationaddress, shipmentstatus, planneddeliverydate) VALUES ($1, $2, $3, $4)";
    const values = [customername, destinationaddress, 'Pending', planneddeliverydate];

    await pool.query(query, values);

    return NextResponse.json({ result: "Successfully registered", success: true }, { status: 201 });
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
  }
}
