import React from "react";

import {
    createAppContainer,
    createStackNavigator,
} from "react-navigation";

import {
    ConversationScreen,
    UserlistScreen,
    ChatScreen,
} from './screens';

const mainNavigator = createStackNavigator({
    Conversation: ConversationScreen,
    Userlist: UserlistScreen,
    Chat: ChatScreen,
})


const AppNavigator = createAppContainer(mainNavigator);

export { AppNavigator }