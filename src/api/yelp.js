import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization: 'Bearer 8tJScLF71EuFGPDmCZdgpMHj0DnQlY9UVEpPBgDvaXv5CMv-6nK6BbQbCObC8dAbbD2IhyDPmeE0xHfudzuA156cjXlTeP2t668bAz59UGnVSOcvshdPUgrKfHHOYHYx'
  }
});
