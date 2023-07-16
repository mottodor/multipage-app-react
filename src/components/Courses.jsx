import { Link, useLocation, useNavigate } from 'react-router-dom';
import courses from '../data/courses';
import queryString from 'query-string';
import { useState, useEffect } from 'react';

const SORT_KEYS = ['id', 'slug', 'title'];

function sortCourses(courses, key) {
  const sortedCourses = [...courses];
  if (!key || !SORT_KEYS.includes(key)) {
    return sortedCourses;
  }
  sortedCourses.sort((a, b) => (a[key] > b[key] ? 1 : -1));

  return sortedCourses;
}

const Courses = () => {
  const location = useLocation();
  const query = queryString.parse(location.search);
  const navigate = useNavigate();

  const [sortKey, setSortKey] = useState(query.sort);
  const [sortedCourses, setSortedCourses] = useState(
    sortCourses(courses, sortKey)
  );

  function changeSortKeyHandler(e) {
    setSortKey(e.target.value);
  }

  useEffect(() => {
    if (!SORT_KEYS.includes(sortKey)) {
      navigate('.');
      setSortKey();
    }
    setSortedCourses(sortCourses(courses, sortKey));
    !sortKey ? navigate('.') : navigate(`?sort=${sortKey}`);
  }, [sortKey, navigate]);

  return (
    <>
      <h1>{sortKey ? `Courses sorted by ${sortKey}` : 'Courses'}</h1>

      <fieldset>
        <legend>Filter courses by:</legend>
        <div>
          <label>
            <input
              type="radio"
              value=""
              checked={!sortKey}
              onChange={(e) => changeSortKeyHandler(e)}
            />
            None
          </label>
          <label>
            <input
              type="radio"
              value="title"
              checked={sortKey === 'title' ? true : false}
              onChange={(e) => changeSortKeyHandler(e)}
            />
            Title
          </label>
          <label>
            <input
              type="radio"
              value="slug"
              checked={sortKey === 'slug' ? true : false}
              onChange={(e) => changeSortKeyHandler(e)}
            />{' '}
            Slug
          </label>
          <label>
            <input
              type="radio"
              value="id"
              checked={sortKey === 'id' ? true : false}
              onChange={(e) => changeSortKeyHandler(e)}
            />{' '}
            ID
          </label>
        </div>
      </fieldset>

      {sortedCourses.map((course) => (
        <div key={course.id}>
          <Link to={course.slug} className="courseLink">
            Title: {course.title} - ID: {course.id} - slug: {course.slug}
          </Link>
        </div>
      ))}
    </>
  );
};
export default Courses;
