import { createPosts } from './post-generator.js';
import { renderPhotos } from './render-photos.js';

const posts = createPosts();
renderPhotos(posts);
