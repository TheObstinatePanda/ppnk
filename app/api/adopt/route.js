import {NextResponse } from 'next/server';
import { addApplicant } from '../../../View/App/lib/db';

export async function POST(req) {
    const data = await req.rson();
    addApplicant({ ...data, submitted_at: new Date().toISOString() });
    return NextResponse.json({ success: true });
}