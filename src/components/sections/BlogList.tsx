import { Badge } from '../ui/Badge'
import s from './BlogList.module.css'

interface Post {
  tag: string
  title: string
  excerpt: string
  authorInitials: string
  authorName: string
  date: string
}

interface BlogListProps {
  posts: Post[]
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <section className={s.root}>
      <div className={s.grid}>
        {posts.map((post, i) => (
          <div key={i} className={s.cell}>
            <Badge variant="neutral">{post.tag}</Badge>
            <div className={s.title}>{post.title}</div>
            <p className={s.excerpt}>{post.excerpt}</p>
            <div className={s.footer}>
              <div className={s.author}>
                <div className={s.avatar}>{post.authorInitials}</div>
                <span className={s.authorName}>{post.authorName}</span>
              </div>
              <span className={s.date}>{post.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
