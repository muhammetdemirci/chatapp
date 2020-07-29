import React from 'react';
import { ScrollView } from 'react-native'
import { UserCard, Loading } from '../components';
import firebaseApi from '../firebase';
import { connect } from "react-redux";

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
        const res = await firebaseApi.getUsers(this.props.user_uid);
        this.setState({ users: res, loading: false });
    }

    render() {

        const { users, loading } = this.state;
        if (loading)
            return <Loading />;

        return (<ScrollView style={{
            flex: 1,
            backgroundColor: '#f4f4f4'
        }} >
            {
                this.state.users.map((data) =>
                    <UserCard key={data.username} onPress={(data) => this.props.navigation.navigate('Chat', { data })}
                        data={data} />)
            }
        </ScrollView>);
    }
}

function mapStateToProps(state) {
    return {
        user_uid: state.auth.user_uid,
    }
}

export default connect(mapStateToProps, {})(UserListScreen);