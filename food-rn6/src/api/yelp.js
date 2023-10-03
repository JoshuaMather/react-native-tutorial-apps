import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization:
            'Bearer gpHo0LyxhyDwMBVLZJEr8R0eTsXadjTyHyxfytDtvhpOef6DRwII1u_qA3xOkPw2b9TCmvrIjfN6wnQzotNcqig9hkAmogPU4Cx-B6opuh8dydue54TEGTcLGfwTZXYx',
    },
});
