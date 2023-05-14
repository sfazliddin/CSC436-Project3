import supabase from "@/utils/supabase"
import { notFound } from 'next/navigation'

const Page = async ({ params: { slug } }) => {
    const { data, error } = await supabase
        .from("profile")
        .select("user_id")
        .eq("slug", slug)
        .limit(1)
        .single();
    if (!data) {
        notFound();
    }
    if (!!error) {
        return <p>{error.message}</p>
    }



    return <pre>
        {JSON.stringify(slug, 0, 1)}
    </pre>
}


export default Page