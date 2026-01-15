import './css/style.css';
import $ from 'jquery';
import loadBlogs from './blogList';

loadBlogs();

$('#home').on('click', loadBlogs);
