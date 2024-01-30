import { View, Text } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomBarNavigation } from "components/BottomBarNavigation";

export const DiaryScreen = () => {
       return (
        <>
            <SafeAreaView style={{ flex: 1}}>
                <View style={{
                    flex: 1,
                }}>
                    
                    <View>
                        
                    </View>

                </View>
                <BottomBarNavigation/>
            </SafeAreaView>
        </>
       )
}