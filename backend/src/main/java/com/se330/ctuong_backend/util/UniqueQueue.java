package com.se330.ctuong_backend.util;

import java.util.Queue;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class UniqueQueue<T> {
    private final Queue<T> queue = new ConcurrentLinkedQueue<>();
    private final Set<T> set = ConcurrentHashMap.newKeySet();

    public static void main(String[] args) {
        UniqueQueue<Integer> uniqueQueue = new UniqueQueue<>();

        // Chạy đa luồng
        ExecutorService executor = Executors.newFixedThreadPool(3);
        for (int i = 0; i < 10; i++) {
            final int num = i % 5; // Một số phần tử bị trùng
            executor.submit(() -> {
                uniqueQueue.enqueue(num);
                System.out.println("Enqueued: " + num);
            });
        }

        executor.shutdown();
        while (!executor.isTerminated()) {
        }

        while (!uniqueQueue.isEmpty()) {
            System.out.println("Dequeued: " + uniqueQueue.dequeue());
        }
    }

    public synchronized void enqueue(T item) {
        if (set.add(item)) { // Nếu chưa có thì thêm vào queue
            queue.offer(item);
        }
    }

    public synchronized T dequeue() {
        T item = queue.poll();
        if (item != null) {
            set.remove(item);
        }
        return item;
    }

    public boolean contains(T item) {
        return set.contains(item);
    }

    public boolean isEmpty() {
        return queue.isEmpty();
    }

    public int size() {
        return queue.size();
    }
}
