import { Text, View, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Slider from "@react-native-community/slider";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

import { meditations } from "@/data";
import audio from "@assets/meditations/audio1.mp3";

export default function MeditationDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const meditation = meditations.find((m) => m.id === Number(id));
    const player = useAudioPlayer(audio);
    const status = useAudioPlayerStatus(player);

    const formatSeconds = (milliseconds: number) => {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    if (!meditation) {
        return <Text>Meditation not found!</Text>;
    }

    return (
        <SafeAreaView className="bg-orange-500 flex-1 justify-between">
            <View className="flex-1">
                <View className="flex-1">
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
                </View>
                <Pressable
                    onPress={() =>
                        player.playing ? player.pause() : player.play()
                    }
                    className="bg-zinc-800 self-center w-24 aspect-square rounded-full items-center justify-center"
                >
                    <FontAwesome6
                        name={status.playing ? "pause" : "play"}
                        size={24}
                        color="snow"
                    />
                </Pressable>
                <View className="flex-1">
                    <View className="p-10 mt-auto gap-5">
                        <View className="flex-row justify-between">
                            <MaterialIcons
                                name="airplay"
                                size={24}
                                color="#3a3937"
                            />
                            <MaterialCommunityIcons
                                name="cog-outline"
                                size={24}
                                color="#3a3937"
                            />
                        </View>
                        <View>
                            <Slider
                                style={{ width: "100%", height: 3 }}
                                value={status.currentTime / status.duration}
                                onSlidingComplete={(value) =>
                                    player.seekTo(value * status.duration)
                                }
                                minimumValue={0}
                                maximumValue={1}
                                minimumTrackTintColor="#3a3937"
                                maximumTrackTintColor="#3a393755"
                                thumbTintColor="#3a3937"
                            />
                        </View>
                        <View className="flex-row justify-between">
                            <Text>{formatSeconds(status.currentTime)}</Text>
                            <Text>{formatSeconds(status.duration)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
