import { Text, View, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { meditations } from "@/data";

export default function MeditationDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const meditation = meditations.find((m) => m.id === Number(id));

    if (!meditation) {
        return <Text>Meditation not found!</Text>;
    }

    return (
        <SafeAreaView className="bg-orange-500 flex-1">
            <View className="flex-row items-center justify-between p-10">
                <AntDesign name="infocirlceo" size={24} color="black" />

                <View className="bg-zinc-800 p-2 rounded-md">
                    <Text className="text-zinc-100 font-semibold">
                        Today's meditation
                    </Text>
                </View>

                <AntDesign
                    onPress={() => router.back()}
                    name="close"
                    size={24}
                    color="black"
                />
            </View>

            <Text className="text-3xl text-center font-semibold px-2">
                {meditation?.title}
            </Text>

            <View className="bg-zinc-800 self-center w-24 aspect-square rounded-full items-center justify-center">
                <FontAwesome6 name="play" size={24} color="snow" />
                {/* <FontAwesome6 name="pause" size={24} color="black" /> */}
            </View>

            <View className="p-10">
                <View className="flex-row justify-between">
                    <FontAwesome6 name="play" size={24} color="#3a3937" />
                    <AntDesign name="setting" size={24} color="#3a3937" />
                </View>
            </View>
        </SafeAreaView>
    );
}
