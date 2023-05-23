import LinksLinks from "csc-start/components/LinksLinks";
import SocialLinks from "csc-start/components/SocialLinks";
import { getUserById } from "csc-start/utils/data";
import { notFound } from "next/navigation";

export const revalidate = 30;

const Page = async ({ params: { Id } }) => {

    const { data, error } = await getUserById(Id);

    if (!!error) {
        return <p>{error.message}</p>
    }
    if (!data) {
        notFound();
    }


    const { user_id } = data;

    return <>
        <SocialLinks user_id={user_id} />
        <LinksLinks user_id={user_id} />
    </>
}

export default Page;