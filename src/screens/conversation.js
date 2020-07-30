import React from 'react';
import { ScrollView, RefreshControl } from 'react-native'
import { IconButton, UserCard, Loading } from '../components';
import firebaseApi from '../firebase';
import { connect } from "react-redux";
import { COLORS } from '../color';

class ConversationScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Chat App",
            headerLeft: () => (<IconButton
                onPress={() => navigation.navigate('Userlist')}
                name={"add"} size={36} iconStyle={{ color: COLORS.BLUE }} />)
        };
    };

    state = {
        chats: [],
        loading: false,
        refreshing: false,
    }

    componentDidMount() {
        this.fetch();
    }

    async fetch() {
        this.setState({ loading: true })
        const res = await firebaseApi.getChats(this.props.user_uid)
        this.setState({ chats: res, loading: false });
    }

    async onRefresh() {
        this.setState({ refreshing: true })
        const res = await firebaseApi.getChats(this.props.user_uid)
        this.setState({ chats: res, refreshing: false });
    }

    render() {
        const { chats, loading, refreshing } = this.state;
        if (loading)
            return <Loading />;

        return (<ScrollView style={{
            flex: 1,
            backgroundColor: '#f4f4f4'
        }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={() => this.onRefresh()} />
            }
        >
            {
                chats.map((data) =>
                    <UserCard key={data.username} onPress={(data) => this.props.navigation.navigate('Chat', { data, chat_id: data.id })}
                        data={data} />)
            }
        </ScrollView>);
    }
}

function mapStateToProps(state) {
    return {
        user_uid: state.auth.user_uid
    }
}


export default connect(mapStateToProps, {})(ConversationScreen);