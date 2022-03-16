import Directory from "../../components/directory/directory.component";

const Home = () => {
  const categories = [
    {
      id: 1,
      title: 'hats',
      imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
      linkUrl: 'shop/hats'
    },
    {
      id: 2,
      title: 'jackets',
      imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
      linkUrl: 'shop/jackets'
    },
    {
      id: 3,
      title: 'shoes',
      imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
      linkUrl: 'shop/sneakers'
    },
    {
      id: 4,
      title: 'women',
      imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
      size: 'large',
      linkUrl: 'shop/womens'
    },
    {
      id: 5,
      title: 'men',
      imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
      size: 'large',
      linkUrl: 'shop/mens'
    }
  ]

  return (
    <Directory categories={categories}/>
  );
}

export default Home;
