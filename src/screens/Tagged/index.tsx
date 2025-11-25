import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View, ViewToken } from 'react-native';
import { reelsData } from './data';
import ReelCard from '../../components/ReelCard';
import { useNavigation } from '@react-navigation/native';

const ReelsScreen = () => {
  const [currentId, setCurrentId] = useState<string>('1');
  const [mounted, setMounted] = useState(true);
  const navigation = useNavigation<any>();

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const visibleItem = viewableItems[0].item;
        setCurrentId(visibleItem.id);
      }
    },
  ).current;

  useEffect(() => {
    const unsubFocus = navigation.addListener('focus', () => setMounted(true));
    const unsubBlur = navigation.addListener('blur', () => setMounted(false));

    return () => {
      unsubFocus();
      unsubBlur();
    };
  }, [navigation]);

  if (!mounted) {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      />
    );
  }

  return (
    <FlatList
      data={reelsData}
      renderItem={({ item }) => (
        <ReelCard item={item} key={item.id} isVisible={currentId === item.id} />
      )}
      pagingEnabled
      snapToAlignment="center"
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 30,
      }}
    />
  );
};

export default ReelsScreen;
