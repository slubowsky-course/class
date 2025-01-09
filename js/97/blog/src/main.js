import loadBlogs from './blogList';
import './css/style.css';
import $ from 'jquery';

loadBlogs();
$('#homelink').on('click', loadBlogs);
