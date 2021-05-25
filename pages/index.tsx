import Link from "next/link";
import Head from "next/head";
import Button from "@material-ui/core/Button";
import { fetchWeaponsThunk, Weapon } from "../redux/slice";
import { NextPage } from "next";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/sliceData';
import { RootState } from '../redux/store';

const s = {
  aboutButton: {
    margin: 10
  }
};

type Props = {
  name: string;
  weapons: Array<Weapon>;
};

const Page: NextPage<Props> = ({ name, weapons }) => {

  const postsReducer = useSelector((state: RootState) => state.postsReducer);
  const { posts } = postsReducer;

  const dispatch = useDispatch();

  const handleData = () => {
    dispatch(getAllPosts());
  }

  return (
    <div>
      <Head>
        <title>Test App | Index</title>
      </Head>
      Home view, hello {name}!
      <div>{weapons && weapons.map(w => <p>{w.name}</p>)}</div>
      <Link href="/about" prefetch>
        <Button style={s.aboutButton} variant="outlined" color="primary" onClick={ handleData}>
          About
        </Button>
      </Link>
    </div>
  );
}

Page.getInitialProps = async ctx => {
  const { dispatch } = ctx.store;

  // @ts-ignore
  const res = dispatch(fetchWeaponsThunk());
  const weapons: Weapon[] = res.payload;

  return {
    name: "Jairo",
    weapons
  };
};

export default Page;
