import fs from 'node:fs';
import path from 'node:path';
import type { Post } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () =>  {
    const postsDir = path.resolve('content/posts');
    
    if (!fs.existsSync(postsDir)) {
        return {
            posts: []
        };
    }

    const files = fs.readdirSync(postsDir);
    
    const posts = files
        .filter((file) => file.endsWith('.md'))
        .map((file) => {
            const filePath = path.join(postsDir, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            
            // Extract metadata block between +++ or ---
            const metadataMatch = content.match(/^(?:\+\+\+|---)([\s\S]+?)(?:\+\+\+|---)/);
            const metadataString = metadataMatch ? metadataMatch[1] : '';
            
            // Simple regex based parsing
            const titleMatch = metadataString.match(/title\s*=\s*"([^"]+)"/);
            const dateMatch = metadataString.match(/date\s*=\s*"([^"]+)"/);
            const descMatch = metadataString.match(/description\s*=\s*"([^"]+)"/);
            
            return {
                slug: file.replace(/\.md$/, ''),
                title: titleMatch ? titleMatch[1] : null,
                date: dateMatch ? dateMatch[1] : null,
                description: descMatch ? descMatch[1] : null,
            } as Post ;
        })
        
    return {
        posts
    };
};

