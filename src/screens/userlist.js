import React from 'react';
import { View } from 'react-native'
import { UserCard, Loading } from '../components';
import firebaseApi from '../firebase';

class UserListScreen extends React.Component {
    state = {
        users: [],
        loading: false
    }

    componentDidMount() {
        this.fetch();
    }

    async fetch() {
        this.setState({ loading: true })
        const res = await firebaseApi.getUsers();
        this.setState({ users: res, loading: false });
    }

    render() {

        const { users, loading } = this.state;
        console.warn('users', users)
        if (loading)
            return <Loading />;

        return (<View style={{
            flex: 1,
            backgroundColor: '#f4f4f4'
        }} >
            {
                this.state.users.map((data) =>
                    <UserCard key={data.username} onPress={(username) => this.props.navigation.navigate('Chat', { username })}
                        username={data.username} />)
            }
        </View>);
    }
}

export default UserListScreen;