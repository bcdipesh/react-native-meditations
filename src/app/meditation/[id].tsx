import { Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";

import { meditations } from "@/data";

export default function MeditationDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const meditation = meditations.find((m) => m.id === Number(id));
    const { top } = useSafeAreaInsets();

    if (!meditation) {
        return <Text>Meditation not found!</Text>;
    }

    return (
        <SafeAreaView>
            <Text className="text-3xl">{meditation?.title}</Text>
            <AntDesign
                onPress={() => router.back()}
                className="absolute right-4"
                style={{ top: top + 16 }}
                name="close"
                size={24}
                color="black"
            />
        </SafeAreaView>
    );
}
