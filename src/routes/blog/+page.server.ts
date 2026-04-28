import fs from 'node:fs';
import path from 'node:path';
import type { Post } from '$lib/types';
import type { PageServerLoad } from './$types';

// INFO: file naming of blogposts must follow: "$YYYY-$MM-$DD_slug-name-with-hyphens.md"
function fileNameIsValid(fileName: string): boolean {
    const pattern = /^\d{4}-\d{2}-\d{2}_[a-z0-9-]+\.md$/;
    return pattern.test(fileName);
}

export const load: PageServerLoad = async () =>  {
    const postsDir = path.resolve('content/posts');
    
    if (!fs.existsSync(postsDir)) {
        return {
            posts: []
        };
    }

    const files = fs.readdirSync(postsDir);
    
    const posts = files
        .filter((file) => fileNameIsValid(file))
        .map((file: string) => {
            const filePath = path.join(postsDir, file);
            const content = fs.readFileSync(filePath, 'utf-8');

            // Extract metadata block between +++ or ---
            const metadataMatch = content.match(/^(?:\+\+\+|---)([\s\S]+?)(?:\+\+\+|---)/);
            const metadataString = metadataMatch ? metadataMatch[1] : '';
            const titleMatch = metadataString.match(/title\s*=\s*"([^"]+)"/);
            const descMatch = metadataString.match(/description\s*=\s*"([^"]+)"/);

            const title = titleMatch? titleMatch[1] : "";
            const description = descMatch? descMatch[1] : "";
            return [title, description, file];
        })
        .filter(([title, desc, _]) => title !== "" && desc !== "")
        .map(([title, description, file]) => {  
            const [date, slug_str] = file.split("_"); 
            return {
                slug: slug_str.replace(/\.md$/, ''),
                date,
                title,
                description,
            } as Post ;
        })
        
    return {
        posts
    };
};

