import { normalizeImagePath } from "@/shared/utils/normalizeImagePath"
import css from "./PostPreview.module.css"
import { Typography } from "@/shared/ui/typography/Typography"
import type { Post } from "@/shared/types/api";


export interface PostPreviewProps {
    post: Post;
    
}

export const PostPreview = ({ post }: PostPreviewProps) => {
    const previewImage = post.media[0];
    return (
        <div className={css.card}>
            {previewImage && (
                <img
                src={normalizeImagePath(previewImage)}
                alt="Post preview"
                className={css.image}
                />
            )}
            <div className={css.content}>
                <Typography
                    className={css.description}
                    variant="body"
                    textColor="gray"
                    truncate
                    lineClamp={2}
                    >
                    {post.body}
                </Typography>
            </div>
        </div>
    )
}