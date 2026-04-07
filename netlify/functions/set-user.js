import { createClient } from '@supabase/supabase-js';
import { getId } from '../../dist/utils.js';

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
        const { name, email, password } = await request.json();
        const id = getId(name);
        const user = { id, name, email, password };

        if (!name || !email || !id) {
            return new Response(
                JSON.stringify({success: false, error: "Invalid name and email"}),
                { status: 500, headers: defaultHeader() }
            );
        }

        const { data, error: fetchError } = await supabaseClient
            .from("users")
            .select("id")
            .eq("email", email);

        if (fetchError) {
            return new Response(
                JSON.stringify({success: false, error: fetchError.message}),
                { status: 500, headers: defaultHeader() }
            );
        }

        if (data.length >= 1) {
            return new Response(
                JSON.stringify({ success: false, error: "An account already exist with this email address." }),
                { status: 500, headers: defaultHeader() }
            );
        }

        const { error } = await supabaseClient
            .from("users")
            .insert(user);

        if (error) {
            return new Response(
                JSON.stringify({ success: false, error: error.message }),
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
