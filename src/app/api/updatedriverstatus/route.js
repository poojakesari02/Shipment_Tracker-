import { NextResponse } from "next/server";
import pool from "../../../connection/db";

export async function POST(request) {
  let payload = await request.json();

  if (!payload.shipmentstatus || !payload.assigneddriverid) {
    return NextResponse.json({ result: "Required field not found", success: false }, { status: 400 });
  }

  try {
    const query = `UPDATE shipments
    SET
        shipmentstatus = $1,
        actualdeliverydate = CURRENT_DATE
    WHERE
    assigndriverid = $2;`;
    const values = [payload.shipmentstatus,payload.assigneddriverid];
console.log(values, 'hujhsgcu');
    const { rowCount } = await pool.query(query, values);
console.log(rowCount, 'guyg');
    if (rowCount > 0) {
      return NextResponse.json({ result: "Successfully updated driver", success: true }, { status: 201 });
    } else {
      return NextResponse.json({ result: "Shipment not found", success: false }, { status: 404 });
    }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
  }
}
