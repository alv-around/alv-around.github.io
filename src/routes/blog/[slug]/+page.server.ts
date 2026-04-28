import fs from 'node:fs';
import path from 'node:path';
import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import markedCodePreview from 'marked-code-preview';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const { slug } = params;
    const postsDir = path.resolve('content/posts');
    
    if (!fs.existsSync(postsDir)) {
        throw error(404, 'Post not found');
    }

    const files = fs.readdirSync(postsDir);
    const pattern = new RegExp(`^\\d{4}-\\d{2}-\\d{2}_${slug}\\.md$`);
    const fileName = files.find(f => pattern.test(f));

    if (!fileName) {
        throw error(404, 'Post not found');
    }

    const filePath = path.join(postsDir, fileName);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract metadata and content
    const metadataMatch = content.match(/^(?:\+\+\+|---)([\s\S]+?)(?:\+\+\+|---)([\s\S]*)$/);
    
    let title = '';
    let markdownContent = content;
    let description = '';
    let date = fileName.split('_')[0];

    if (metadataMatch) {
        const metadataString = metadataMatch[1];
        markdownContent = metadataMatch[2].trim();

        const titleMatch = metadataString.match(/title\s*=\s*"([^"]+)"/);
        title = titleMatch ? titleMatch[1] : "";
        
        const descMatch = metadataString.match(/description\s*=\s*"([^"]+)"/);
        description = descMatch ? descMatch[1] : "";
    }

    const renderer = {
        code({ text, lang }: any) {
            const language = (lang || '').match(/\S*/)[0];
            const escaped = text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
            if (!language) {
                return `<pre><code>${escaped}</code></pre>\n`;
            }
            return `<pre data-lang="${language}"><code class="language-${language}">${escaped}</code></pre>\n`;
        }
    };

    const htmlContent = await marked
        .use({ gfm: true, renderer })
        .use(markedCodePreview())
        .parse(markdownContent);

    return {
        title,
        description,
        date,
        content: htmlContent
    };
};



