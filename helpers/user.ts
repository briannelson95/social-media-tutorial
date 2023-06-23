type Props = {
    supabase: any;
    userId: any;
    file: any;
    bucket: any;
    profileCol: any;
}

export async function uploadUserImage({supabase, userId, file, bucket, profileCol}: Props) {
    return new Promise(async (resolve, rejects) => {
        const newName = Date.now() + file.name;
        const {data, error} = await supabase.storage
            .from(bucket)
            .upload(newName, file);


        if (error) throw error;
        if (data) {
            const url = process.env.NEXT_PUBLIC_SUPABASE_URL + `/storage/v1/object/public/${bucket}/` + data?.path;
            supabase.from('profiles')
                .update({
                    [profileCol]: url,
                })
                .eq('id', userId)
                .then((result:any) => {
                    if (!result.error) {
                        //@ts-ignore
                        resolve();
                    } else {
                        throw result.error;
                    }
                })
        }
    })
}