import { Image } from '@/shared/ui/image/Image'
import css from './Avatar.module.css'

const getInitials = (name: string) => {
  if (!name) return '?'
  return name
    .split(' ')
    .map(n => n.charAt(0).toUpperCase())
    .filter(Boolean)
    .slice(0, 2)
    .join('')
}


interface AvatarProps {
    src?: string | null;
    alt?: string;
    size?: number;
    name: string
}

const Avatar = ({ src, size = 40, name }: AvatarProps) => {
  return (
        <Image
            src={src}
            alt={name || 'Avatar'}
            className={css.Avatar}
            style={{
                width: size,
                height: size,
            }}
            renderFallback={() => (
                <div
                className={css.Avatar}
                style={{
                    width: size,
                    height: size,
                    fontSize: `${Math.round(size / 2.5)}px`,
                }}
                >
                {getInitials(name)}
                </div>
        )}
        />
  )
}

export { Avatar }