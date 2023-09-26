import { NextResponse } from "next/server";
import pool from "../../../connection/db";


export async function POST(request) {
    let payload = await request.json();
  
    if (!payload.assigndriverid ) {
      return NextResponse.json({ result: "Required field not found", success: false }, { status: 400 });
    }
  
    try {
      const query = `SELECT
      a.shipmentid,
      a.customername,
      a.destinationaddress,
      a.shipmentstatus,
      a.assigndriverid,
      a.planneddeliverydate,
      a.actualdeliverydate,
      b.username,
      b.driverid
  FROM
      shipments AS a
  LEFT JOIN
      users AS b
      on a.assigndriverid = b.driverid
  where a.assigndriverid= $1`;
      const values = [payload.assigndriverid];
  
      const { rows } = await pool.query(query, values);

      console.log(rows);
  
      if (rows.length>0) {
        return NextResponse.json({ result: "Successfully Fetch Data",data:rows, success: true }, { status: 201 });
      } else {
        return NextResponse.json({ result: "Something Went Wrong", success: false }, { status: 404 });
      }
    } catch (error) {
      console.error("Error executing SQL query:", error);
      return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
    }
  }
  