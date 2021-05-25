import Link from "next/link";
import Head from "next/head";
import Button from "@material-ui/core/Button";
import { Posts } from "../redux/sliceData";
import { NextPage } from "next";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const s = {
  aboutButton: {
    margin: 10
  }
};

type Props = {
  posts: Array<Posts>;
};

const Page: NextPage<Props> = () => {

  const postsReducer = useSelector((state: RootState) => state.postsReducer);
  const { posts } = postsReducer;

  return (
  <div>
    <Head>
      <title>Test App | About</title>
    </Head>
    <main>
        <ul>
          {posts?.map(post => (
            <li key={post?.id}>{ post.title}</li>
          ))}
      </ul>
    </main>
    <Link href="/" prefetch>
      <Button style={s.aboutButton} variant="outlined" color="primary">
        Home
      </Button>
    </Link>
    </div>
  )
};

export default Page;
