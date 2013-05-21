import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.math.stat.clustering.KMeansPlusPlusClusterer;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.SequenceFile;
import org.apache.hadoop.io.Text;
import org.apache.lucene.benchmark.utils.ExtractReuters;
import org.apache.mahout.clustering.Cluster;
import org.apache.mahout.clustering.classify.WeightedVectorWritable;
import org.apache.mahout.clustering.dirichlet.UncommonDistributions;
import org.apache.mahout.clustering.display.DisplayCanopy;
import org.apache.mahout.clustering.display.DisplayDirichlet;
import org.apache.mahout.clustering.iterator.KMeansClusteringPolicy;
import org.apache.mahout.clustering.kmeans.KMeansDriver;
import org.apache.mahout.clustering.kmeans.Kluster;
import org.apache.mahout.common.distance.EuclideanDistanceMeasure;
import org.apache.mahout.math.DenseVector;
import org.apache.mahout.math.NamedVector;
import org.apache.mahout.math.RandomAccessSparseVector;
import org.apache.mahout.math.Vector;
import org.apache.mahout.math.VectorWritable;
import org.junit.Test;

public class ClusteringTest {
	public static final double[][] points = { { 1, 1 }, { 2, 1 }, { 1, 2 },
			{ 2, 2 }, { 3, 3 }, { 8, 8 }, { 9, 8 }, { 8, 9 }, { 9, 9 } };

	public static void writePointsToFile(List<Vector> points, String fileName,
			FileSystem fs, Configuration conf) throws IOException {
		Path path = new Path(fileName);
		SequenceFile.Writer writer = new SequenceFile.Writer(fs, conf, path,
				LongWritable.class, VectorWritable.class);
		long recNum = 0;
		VectorWritable vec = new VectorWritable();
		for (Vector point : points) {
			vec.set(point);
			writer.append(new LongWritable(recNum++), vec);
		}
		writer.close();
	}

	public static List<Vector> getPoints(double[][] raw) {
		List<Vector> points = new ArrayList<Vector>();
		for (int i = 0; i < raw.length; i++) {
			double[] fr = raw[i];
			Vector vec = new RandomAccessSparseVector(fr.length);
			vec.assign(fr);
			points.add(vec);
		}
		return points;
	}

	@Test
	public void main() throws Exception {
		int k = 2;
		List<Vector> vectors = getPoints(points);
		File testData = new File("e:/testdata");
		if (!testData.exists()) {
			testData.mkdir();
		}
		testData = new File("e:/testdata/points");
		if (!testData.exists()) {
			testData.mkdir();
		}
		Configuration conf = new Configuration();
		conf.set("hadoop.tmp.dir", "e:/tmp");
		conf.set("dfs.permissions", "false");
		FileSystem fs = FileSystem.get(conf);
		writePointsToFile(vectors, "e:/testdata/points/file1", fs, conf);
		Path path = new Path("e:/testdata/clusters/part-00000");
		SequenceFile.Writer writer = new SequenceFile.Writer(fs, conf, path,
				Text.class, Kluster.class);
		for (int i = 0; i < k; i++) {
			Vector vec = vectors.get(i);
			Kluster cluster = new Kluster(vec, i,
					new EuclideanDistanceMeasure());
			writer.append(new Text(cluster.getIdentifier()), cluster);
		}
		writer.close();
		KMeansDriver.run(conf, new Path("e:/testdata/points"), new Path(
				"e:/testdata/clusters"), new Path("output"),
				new EuclideanDistanceMeasure(), 0.001, 10, true, 1, false);
		SequenceFile.Reader reader = new SequenceFile.Reader(fs, new Path(
				"e:/output/" + Cluster.CLUSTERED_POINTS_DIR + "/part-m-00000"),
				conf);
		IntWritable key = new IntWritable();
		WeightedVectorWritable value = new WeightedVectorWritable();
		while (reader.next(key, value)) {
			System.out.println(value.toString() + " belongs to cluster "
					+ key.toString());
		}
		reader.close();
	}

	@Test
	public void main1() throws Exception {
		List<NamedVector> apples = new ArrayList<NamedVector>();
		NamedVector apple;
		apple = new NamedVector(new DenseVector(new double[] { 0.11, 510, 1 }),
				"Small round green apple");
		apples.add(apple);
		apple = new NamedVector(new DenseVector(new double[] { 0.23, 650, 3 }),
				"Large oval red apple");
		apples.add(apple);
		apple = new NamedVector(new DenseVector(new double[] { 0.09, 630, 1 }),
				"Small elongated red apple");
		apples.add(apple);
		apple = new NamedVector(new DenseVector(new double[] { 0.25, 590, 3 }),
				"Large round yellow apple");
		apples.add(apple);
		apple = new NamedVector(new DenseVector(new double[] { 0.18, 520, 2 }),
				"Medium oval green apple");
		Configuration conf = new Configuration();
		FileSystem fs = FileSystem.get(conf);
		Path path = new Path("appledata/apples");
		SequenceFile.Writer writer = new SequenceFile.Writer(fs, conf, path,
				Text.class, VectorWritable.class);
		VectorWritable vec = new VectorWritable();
		for (NamedVector vector : apples) {
			vec.set(vector);
			writer.append(new Text(vector.getName()), vec);
		}
		writer.close();
		SequenceFile.Reader reader = new SequenceFile.Reader(fs, new Path(
				"appledata/apples"), conf);
		Text key = new Text();
		VectorWritable value = new VectorWritable();
		while (reader.next(key, value)) {
			System.out.println(key.toString() + " "
					+ value.get().asFormatString());
		}
		reader.close();
	}

	@Test
	public void test1() {
		File inputFolder = new File("input");
		File outputFolder = new File("input1");
		ExtractReuters extractor = new ExtractReuters(inputFolder, outputFolder);
		extractor.extract();
	}

	@Test
	public void test2() throws Exception {
		DisplayCanopy.main(null);
	}
}
