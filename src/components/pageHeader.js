import React from 'react';
import { Helmet } from 'react-helmet';

export default function PageHeader({ title }) {
  return (
    <>
    <Helmet title={`${title}`} />
    <Helmet>
      {/* Bootstrap styles */}
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
        crossorigin="anonymous" />
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin />
        <script
          src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
          crossorigin
        />
        <script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossorigin
        />
      </Helmet>
    </>
  )
}