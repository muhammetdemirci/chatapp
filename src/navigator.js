import React from "react";

import {
    createAppContainer,
    createStackNavigator,
} from "react-navigation";

import {
    ConversationScreen,
    UserlistScreen,
    ChatScreen,
    MapScreen,
} from './screens';

const mainNavigator = createStackNavigator({
    Conversation: ConversationScreen,
    Userlist: UserlistScreen,
    Chat: ChatScreen,
    Map: MapScreen,
})


const AppNavigator = createAppContainer(mainNavigator);

export { AppNavigator }