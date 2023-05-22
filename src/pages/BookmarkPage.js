import { ThemeProvider } from "@emotion/react";
import { Container, createTheme, Link, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import PropertBookmarkCard from "../components/langdingpageComp/propert/PropertBookmarkCard";
import { getBookmark } from "../features/bookmark/bookmarkSlice";
const theme = createTheme();

const breadcrumbsBookmarkPage = [
  <Link underline="hover" key="1" color="inherit" href="/landingpage">
    K-HOME
  </Link>,
  // <Link underline="hover" key="2" color="inherit" href="/">
  //   Home
  // </Link>,
  <Typography key="3" color="text.primary">
    Bookmark
  </Typography>,
];

const BookmarkPage = () => {
  const dispatch = useDispatch();
  const { currentBookmarkPage, bookmarksById } = useSelector(
    (state) => state.bookmark
  );
  const bookmarks = currentBookmarkPage.map(
    (bookmarkId) => bookmarksById[bookmarkId]
  );

  useEffect(() => {
    dispatch(getBookmark({}));
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          mt: 2,
        }}
      >
        <BreadCrumbs breadcrumb={breadcrumbsBookmarkPage} />
        {bookmarks.length > 0 ? (
          <>
            <div className="row-propert">
              {bookmarks?.map((bookmark) => (
                <PropertBookmarkCard key={bookmark.postId} bookmark={bookmark.postId} />
              ))}
            </div>
          </>
        ) : (
          <Link href="/">
            <Typography sx={{ mt: 3 }} variant="h3" component="h3">
              Empty Accomodation info! Add Some Now
            </Typography>
          </Link>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default BookmarkPage;
