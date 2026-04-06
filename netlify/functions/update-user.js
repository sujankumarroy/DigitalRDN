import { createClient } from '@supabase/supabase-js';

const supabaseClient = createClient(process.env.SUPABASE_DATABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async (request) => {

    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            }
        });
    }

    try {
        const { email, password, name, picture, role } = await request.json();
        const user = { name, picture, role };

        if (!email || !password) {
            return new Response(
                JSON.stringify({success: false, error: "Invalid email and password"}),
                { status: 500, headers: defaultHeader() }
            );
        }

        const { data, error: fetchError } = await supabaseClient
            .from("users")
            .select("*")
            .eq("email", email)
            .eq("password", password)

        if (fetchError) {
            return new Response(
                JSON.stringify({ success: false, error: fetchError.message }),
                { status: 500, headers: defaultHeader() }
            );
        }

        if (data.length === 0) {
            return new Response(
                JSON.stringify({ success: false, error: "user doesn't exist."}),
                { status: 500, headers: defaultHeader() }
            );
        }

        const { error: updateError } = await supabaseClient
            .from("users")
            .update(user)
            .eq("email", email)
            .eq("password", password);

        if (updateError) {
            return new Response(
                JSON.stringify({ success: false, error: updateError.message }),
                { status: 500, headers: defaultHeader() }
            );
        }

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: defaultHeader() }
        );

    } catch (err) {
        return new Response(
            JSON.stringify({ success: false, error: err.message }),
            { status: 500, headers: defaultHeader() }
        );
    }
};

function defaultHeader() {
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
}
